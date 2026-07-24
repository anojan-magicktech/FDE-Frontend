export interface ThreeDPlanDetails {
  software: string;
  scale: string;
  phase: string;
}

export interface ThreeDPlan {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  details: ThreeDPlanDetails;
}
