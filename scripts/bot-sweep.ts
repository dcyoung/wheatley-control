import * as j5 from 'johnny-five';
import { Bot } from '../src';

const board = new j5.default.Board({
  port: 'COM5',
});

board.on('ready', () => {
  const bot = new Bot.Bot();

  let last = false;
  setInterval(() => {
    if (last) {
      bot.stewartPlatform.servo_PR_L.max();
      bot.stewartPlatform.servo_PR_R.min();
    } else {
      bot.stewartPlatform.servo_PR_L.min();
      bot.stewartPlatform.servo_PR_R.max();
    }
    last = !last;
  }, 2000);
});
