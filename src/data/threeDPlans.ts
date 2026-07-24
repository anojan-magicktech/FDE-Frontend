import type { ThreeDPlan } from 'types/threeDPlan';

export const plansData: ThreeDPlan[] = [
  {
    id: 1,
    title: 'Modern Residential Villa',
    category: '3D Render & Planning',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=75',
    description:
      'A photorealistic 3D architectural rendering of a contemporary biophilic villa. The design features floor-to-ceiling glass, steel-supported cantilevers, and integrated green terraces to blend sustainable living with structural luxury.',
    details: {
      software: 'Revit + Lumion',
      scale: '1:50',
      phase: 'Design Visualization',
    },
  },
  {
    id: 2,
    title: 'Commercial Skyscraper Frame',
    category: 'CAD Wireframe Model',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=75',
    description:
      'A complex structural CAD model representing the core steel frame and load-bearing columns of a 45-story commercial tower. Engineered for optimal seismic resistance, aerodynamic wind loads, and foundational stress distribution.',
    details: {
      software: 'AutoCAD + SAP2000',
      scale: '1:100',
      phase: 'Structural Engineering',
    },
  },
  {
    id: 3,
    title: 'Industrial Warehouse Facility',
    category: 'BIM Model Layout',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=75',
    description:
      'A complete Building Information Modeling (BIM) layout for a sustainable logistics hub. Optimizes warehouse layout space, HVAC ductwork distribution, electrical trays, and pre-cast concrete column scheduling.',
    details: {
      software: 'Tekla Structures',
      scale: '1:200',
      phase: 'Pre-construction BIM',
    },
  },
  {
    id: 4,
    title: 'Concrete Bridge Foundation',
    category: 'Structural 3D Design',
    image: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1200&q=75',
    description:
      '3D finite element mesh planning for a high-strength reinforced concrete arch bridge. Features precise load trajectory analysis, shear stress mappings, and rebar reinforcement grids designed for mass public transit.',
    details: {
      software: 'ANSYS + Civil 3D',
      scale: '1:150',
      phase: 'Geotechnical & Stress',
    },
  },
  {
    id: 5,
    title: 'Urban Retail Complex',
    category: 'Exterior Model Perspective',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=75',
    description:
      '3D exterior spatial model planning for a multi-level pedestrian-friendly shopping and retail complex. Focuses on structural aesthetics, solar heat gain mitigation, and optimized natural light distribution via architectural skylights.',
    details: {
      software: 'SketchUp + V-Ray',
      scale: '1:75',
      phase: 'Concept Rendering',
    },
  },
];
