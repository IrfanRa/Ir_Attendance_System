import { PythonShell } from 'python-shell';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { image } = req.body;

    let options = {
      mode: 'text',
      pythonPath: 'C:/Python312/python.exe', // Update this path
      scriptPath: 'D:/CS/Third Semester/ir-attendance-system/python/scripts', // Update this path
      args: [image]
    };

    // Wrap the PythonShell.run in a Promise
    const runPythonScript = () => {
      return new Promise((resolve, reject) => {
        PythonShell.run('data_analysis_preprocessing.py', options, function (err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    };

    try {
      // Wait for the Python script to complete
      const results = await runPythonScript();
      res.status(200).json({ message: "Processed Image", data: results });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
