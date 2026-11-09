/* EnvelopeSpline — the contact section's envelope, as a Spline scene. */
import React from 'react';
import { SplineScene } from './SplineScene';

const SCENE = 'https://prod.spline.design/vPOxKKw66QSzNnjZ/scene.splinecode';

export const EnvelopeSpline = ({ width = 180, height = 180 }) => (
  <SplineScene scene={SCENE} style={{ width, height }} />
);
