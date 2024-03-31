const cron = require('node-cron');
const Task = require('./models/Task');

cron.schedule('* * * * *', async () => {
  console.log('Running cron job to search for tasks with due dates for the current date...');

  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);

    const tasks = await Task.find({ dueDate: { $gte: currentDate, $lt: nextDate } });

    console.log('Tasks with due dates for the current date:', tasks);

  } catch (error) {
    console.error('Error in cron job:', error);
  }
});
