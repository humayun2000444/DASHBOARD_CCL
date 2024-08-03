const express = require('express');
const si = require('systeminformation');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());

app.get('/systeminfo', async (req, res) => {
  try {
    const cpu = await si.cpu();
    const mem = await si.mem();
    const osInfo = await si.osInfo();
    const cpuUsage = await si.currentLoad();
    const diskUsage = await si.fsSize();

    // Convert memory values from bytes to GB
    const totalMemoryGB = (mem.total / (1024 ** 3)).toFixed(2);
    const freeMemoryGB = (mem.free / (1024 ** 3)).toFixed(2);
    const usedMemoryGB = (mem.used / (1024 ** 3)).toFixed(2);
    const memoryUsagePercentage = ((mem.used / mem.total) * 100).toFixed(2);
    
    // Calculate disk usage percentage
    const diskUsedPercentage = ((diskUsage[0].used / diskUsage[0].size) * 100).toFixed(2);

    res.json({
      cpu: {
        manufacturer: cpu.manufacturer,
        brand: cpu.brand,
        speed: cpu.speed,
        cores: cpu.cores,
        usage: cpuUsage.currentLoad.toFixed(2) + '%'
      },
      memory: {
        total: totalMemoryGB,
        free: freeMemoryGB,
        used: usedMemoryGB,
        usage: memoryUsagePercentage + '%'
      },
      disk: {
        total: (diskUsage[0].size / (1024 ** 3)).toFixed(2) + ' GB',
        used: (diskUsage[0].used / (1024 ** 3)).toFixed(2) + ' GB',
        usage: diskUsedPercentage + '%'
      },
      os: {
        platform: osInfo.platform,
        distro: osInfo.distro,
        release: osInfo.release
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://103.95.96.98:${port}`);
});
