import { Mechanism } from 'stewart-platform-simulator';
import { Bot, Config } from '../src';

function getServoDebugString(
  mech: Mechanism.Mechanism3Dof,
  servoOffsetAngles: Config.SimToBotServoOffsetAngles
) {
  const ang_PR_R = Bot.translateServoAngle(
    mech.getServoAngle_Right(),
    servoOffsetAngles.PR_R
  );
  const ang_PR_L = Bot.translateServoAngle(
    mech.getServoAngle_Left(),
    servoOffsetAngles.PR_L
  );
  const ang_Yaw = Bot.translateServoAngle(
    mech.getYawServoAngle(),
    servoOffsetAngles.Yaw
  );
  return `PR_R: ${ang_PR_R.toFixed(2)},\tPR_L: ${ang_PR_L.toFixed(
    2
  )},\tYaw: ${ang_Yaw.toFixed(2)}`;
}

export { getServoDebugString };
