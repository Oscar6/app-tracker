const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./job_appsDB");

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Create
app.post("/job", (req, res) => {
    const newJob = `INSERT INTO companies (company_name, job_role, date_applied, app_status) VALUES ($1, $2, $3, $4)`;
    const values = [
        req.body.company_name,
        req.body.job_role,
        req.body.date_applied,
        req.body.app_status
    ];
    
    pool.query(newJob, values).then((response) => {
        console.log("Uploaded application");
        console.log(response);
    }).catch((err) => {
        console.error(err);
    });
    console.log(req.body);
    res.send("Response received: " + req.body)
});

// Get All
app.get("/job", async(req, res) => {
    try {
        const allJobs = await pool.query(`SELECT * FROM companies`);
        res.json(allJobs.rows)
    } catch (err) {
        console.log(err.message)
    }
});

// Get a job app
app.get("/job/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const jobApp = await pool.query(`SELECT * FROM companies WHERE id = $1`, [id]);

        res.json(jobApp.rows[0]);
    } catch (error) {
        console.log(err.message);
    }
})

// Update
app.put("/job/:id", (req, res) => {
    const jobId = req.params.id; 
    const updateJob = `UPDATE companies SET company_name = $1, job_role = $2, date_applied = $3, app_status = $4 WHERE id = $5`;
    const values = [
        req.body.company_name,
        req.body.job_role,
        req.body.date_applied,
        req.body.app_status
    ];
    
    pool.query(updateJob, [...values, jobId]).then((response) => {
        console.log("Updated application");
        console.log(response);
    }).catch((err) => {
        console.error(err);
    });
    console.log(req.body);
    res.send("Response received: " + req.body)
});

// Delete
app.delete("/job/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteJob = await pool.query(`DELETE FROM companies WHERE id = $1`, [id]);
        res.json("Job has been deleted.");
    } catch (error) {
        console.log(err.message)
    }
})


app.listen(5000, () => {
    console.log("server started on port 5000");
});