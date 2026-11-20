import React from 'react';
import ParabolaSim from './ParabolaSim';
import VectorSim from './VectorSim';
import ProjectileSim from './ProjectileSim';
import BohrAtomSim from './BohrAtomSim';
import PythonLoopSim from './PythonLoopSim';

export default function InteractiveSim({ type }) {
  if (!type) return null;

  switch (type) {
    case 'parabola':
      return <ParabolaSim />;
    case 'vector':
      return <VectorSim />;
    case 'projectile':
      return <ProjectileSim />;
    case 'bohr-atom':
      return <BohrAtomSim />;
    case 'python-loop':
      return <PythonLoopSim />;
    default:
      return null;
  }
}
