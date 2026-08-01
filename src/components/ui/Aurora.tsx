import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

export interface AuroraProps {
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  time?: number;
  speed?: number;
}

export default function Aurora(props: AuroraProps) {
  const { colorStops = ['#f3d061', '#405ff7', '#ffffff'], amplitude = 1.0, blend = 0.5 } = props;
  const propsRef = useRef<AuroraProps>(props);
  propsRef.current = props;

  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    let renderer: Renderer | null = null;
    let gl: any = null;
    let program: Program | undefined;
    let mesh: Mesh | undefined;
    let animateId = 0;
    let isVisible = false;
    let isInitialized = false;

    let currentColorStopsKey = '';
    let lastFrameTime = 0;
    const frameInterval = 1000 / 30; // cap to ~30fps to ease GPU load

    function resize() {
      if (!ctn || !renderer || !program) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      if (!width || !height) return;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    }

    const initWebGL = () => {
      if (isInitialized || !ctn) return;
      isInitialized = true;

      renderer = new Renderer({
        alpha: true,
        premultipliedAlpha: true,
        antialias: false
      });
      gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      if ('style' in gl.canvas) {
        (gl.canvas as HTMLCanvasElement).style.backgroundColor = 'transparent';
      }

      const geometry = new Triangle(gl);
      if (geometry.attributes.uv) {
        delete geometry.attributes.uv;
      }

      const initialStops = propsRef.current.colorStops ?? colorStops;
      currentColorStopsKey = JSON.stringify(initialStops);
      const colorStopsArray = initialStops.map(hex => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });

      program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uAmplitude: { value: amplitude },
          uColorStops: { value: colorStopsArray },
          uResolution: { value: [ctn.offsetWidth || 1, ctn.offsetHeight || 1] },
          uBlend: { value: blend }
        }
      });

      mesh = new Mesh(gl, { geometry, program });
      (gl.canvas as HTMLCanvasElement).style.opacity = '0';
      (gl.canvas as HTMLCanvasElement).style.transition = 'opacity 0.6s ease-out';
      ctn.appendChild(gl.canvas);
      requestAnimationFrame(() => {
        (gl.canvas as HTMLCanvasElement).style.opacity = '1';
      });

      resize();
      window.addEventListener('resize', resize, { passive: true });
    };

    const update = (t: number) => {
      if (!isVisible || !renderer || !program || !mesh) {
        animateId = 0;
        return;
      }
      animateId = requestAnimationFrame(update);

      if (t - lastFrameTime < frameInterval) return;
      lastFrameTime = t;

      const { time = t * 0.01, speed = 1.0 } = propsRef.current;

      program.uniforms.uTime.value = time * speed * 0.1;
      program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? 1.0;
      program.uniforms.uBlend.value = propsRef.current.blend ?? blend;

      const currentStops = propsRef.current.colorStops ?? colorStops;
      const stopsKey = JSON.stringify(currentStops);
      if (stopsKey !== currentColorStopsKey) {
        currentColorStopsKey = stopsKey;
        program.uniforms.uColorStops.value = currentStops.map((hex: string) => {
          const c = new Color(hex);
          return [c.r, c.g, c.b];
        });
      }

      renderer.render({ scene: mesh });
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!isInitialized) {
            initWebGL();
          }
          if (!animateId) {
            animateId = requestAnimationFrame(update);
          }
        }
      },
      { threshold: 0.05 }
    );
    io.observe(ctn);

    // Compile the shader during idle time rather than waiting for the
    // section to scroll into view — avoids a first-time hitch mid-scroll.
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
    const cic = window.cancelIdleCallback ?? window.clearTimeout;
    const idleId = ric(() => {
      if (!isInitialized) initWebGL();
    });

    return () => {
      cic(idleId);
      io.disconnect();
      if (animateId) cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      if (ctn && gl && gl.canvas && (gl.canvas as HTMLCanvasElement).parentNode === ctn) {
        ctn.removeChild(gl.canvas as HTMLCanvasElement);
      }
      if (gl) {
        try {
          gl.getExtension('WEBGL_lose_context')?.loseContext();
        } catch { }
      }
    };
  }, [amplitude, blend]);

  return <div ref={ctnDom} className="w-full h-full absolute inset-0 pointer-events-none z-0" />;
}
