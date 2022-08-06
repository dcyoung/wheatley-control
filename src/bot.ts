import * as j5 from 'johnny-five';
import { Mechanism } from 'stewart-platform-simulator';
import { SimToBotServoOffsetAngles } from './config';
import { capToAngularRangeDeg, rad2Deg } from './conversion-helpers';

// Adapt a servo angle from the sim to the actual bot
function translateServoAngle(servoAngleRad: number, offsetDeg: number): number {
  return capToAngularRangeDeg(rad2Deg(servoAngleRad) - offsetDeg);
}

class StewartPlatform {
  public readonly servo_PR_R;
  public readonly servo_PR_L;
  public readonly servo_Yaw;
  constructor() {
    this.servo_PR_R = new j5.Servo({
      id: 'servo_pitch_roll_right',
      pin: 9,
      type: 'standard',
      range: [95 - 25, 95 + 25],
      fps: 100,
      invert: false,
      // startAt: 95,
      center: true,
    });
    this.servo_PR_L = new j5.Servo({
      id: 'servo_pitch_roll_left',
      pin: 13,
      type: 'standard',
      range: [80 - 25, 80 + 25],
      fps: 100,
      invert: false,
      // startAt: 80,
      center: true,
    });
    this.servo_Yaw = new j5.Servo({
      id: 'servo_yaw',
      pin: 5,
      type: 'standard',
      range: [60, 120],
      fps: 100,
      invert: false,
      startAt: 90,
      center: true,
    });
  }

  // Update a real bot to mirror the simulated position
  applyMechanismState(
    mech: Mechanism.Mechanism3Dof,
    offsetAngles: SimToBotServoOffsetAngles
  ) {
    const ang_PR_R = translateServoAngle(
      mech.getServoAngle_Right(),
      offsetAngles.PR_R
    );
    const ang_PR_L = translateServoAngle(
      mech.getServoAngle_Left(),
      offsetAngles.PR_L
    );
    const ang_Yaw = translateServoAngle(
      mech.getYawServoAngle(),
      offsetAngles.Yaw
    );

    this.servo_PR_R.to(ang_PR_R);
    this.servo_PR_L.to(ang_PR_L);
    this.servo_Yaw.to(ang_Yaw);
  }
}

class Bot {
  public readonly stewartPlatform: StewartPlatform;
  constructor() {
    this.stewartPlatform = new StewartPlatform();
  }
}

export { translateServoAngle, Bot, StewartPlatform };
