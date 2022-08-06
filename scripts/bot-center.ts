import * as j5 from 'johnny-five';
import { Bot } from '../src';

const board = new j5.Board({
  port: 'COM5',
});

board.on('ready', () => {
  const bot = new Bot.Bot();

  bot.stewartPlatform.servo_PR_L.center();
  bot.stewartPlatform.servo_PR_R.center();
  bot.stewartPlatform.servo_Yaw.center();
});
