import * as THREE from 'three';
import { Mechanism } from 'stewart-platform-simulator';

const DEFAULT_MECHANISM_PARAMS = new Mechanism.MechanismParameters3Dof(
  // local_position_plat_ball_joint_right
  new THREE.Vector3(-46.692, 0.217, -38.728),
  //local_position_plat_ball_joint_left
  new THREE.Vector3(46.692, 0, -38.728),
  // local_position_plat_stand_ball_joint
  new THREE.Vector3(0, -47.4726, -10.922),
  //local_position_servo_pitch_roll_right
  new THREE.Vector3(-10.7442, -28.2194, -29.9974),
  //local_position_servo_pitch_roll_left
  new THREE.Vector3(10.7442, -28.2194, -29.9974),
  // mount_angle_servo_pitch_roll_right
  0,
  // mount_angle_servo_pitch_roll_left
  0,
  // length_servo_horn_pitch_roll
  38.1,
  // length_connecting_rod_pitch_roll
  24.5,
  //local_position_servo_yaw
  new THREE.Vector3(-25.2222, -47.4726, 5.461),
  // mount_angle_servo_yaw
  Math.PI / 2,
  // length_servo_horn_yaw
  16,
  // length_connecting_rod_yaw
  32
);

class SimToBotServoOffsetAngles {
  public readonly PR_R: number;
  public readonly PR_L: number;
  public readonly Yaw: number;

  constructor(
    servoHornOffsetAngle_PR_R: number,
    servoHornOffsetAngle_PR_L: number,
    servoHornOffsetAngle_Yaw: number
  ) {
    this.PR_R = servoHornOffsetAngle_PR_R;
    this.PR_L = servoHornOffsetAngle_PR_L;
    this.Yaw = servoHornOffsetAngle_Yaw;
  }
}

const DEFAULT_SIM_TO_BOT_SERVO_OFFSET_ANGLES = new SimToBotServoOffsetAngles(
  // BEFORE OFFSETS
  // Idle:        PR_R: 351.53,   PR_L: 188.14,   Yaw: 111.51
  // Target Up:   PR_R: 6.28,     PR_L: 173.37,   Yaw: 111.51
  // Target Down: PR_R: 337.60,   PR_L: 202.08,   Yaw: 111.51

  // AFTER OFFSETS
  // Idle:        PR_R: 95.00,    PR_L: 80.00,    Yaw: 90.00
  // Target Up:   PR_R: 109.75,   PR_L: 65.23,    Yaw: 90.00
  // TargetDown:  PR_R: 81.07,    PR_L: 93.94,    Yaw: 90.00

  // servoHornOffsetAngle_PR_R
  -103.47, // 351.53 in sim == 95 in reality
  // servoHornOffsetAngle_PR_L
  108.14, // 188.14 in sim == 80 in reality
  // servoHornOffsetAngle_Yaw
  21.51 // 111.51 in sim == 90 in reality
);

export {
  DEFAULT_MECHANISM_PARAMS,
  SimToBotServoOffsetAngles,
  DEFAULT_SIM_TO_BOT_SERVO_OFFSET_ANGLES,
};
