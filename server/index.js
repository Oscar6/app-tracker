const express = require("express");
const helmet = require("helmet");
const app = express();
const cors = require("cors");
const pool = require("./job_appsDB");

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes

// Create
app.post("/job", async (req, res) => {
    try {
      const { company_name, job_role, job_link, job_salary, date_applied, app_status } = req.body;
      const newJob = await pool.query(
        "INSERT INTO companies (company_name, job_role, job_link, job_salary, date_applied, app_status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
        [company_name, job_role, job_link, job_salary, date_applied, app_status]
      );
      res.status(201).json(newJob.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
    console.log(req.body);
  });

// Get All
app.get("/job", async(req, res) => {
    try {
        const allJobs = await pool.query(`SELECT * FROM companies`);
        res.json(allJobs.rows)
    } catch (err) {
        console.log(err.message);
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
    const updateJob = `UPDATE companies SET 
        company_name = $1, 
        job_role = $2, 
        date_applied = $3, 
        app_status = $4, 
        status_rejected = $5,
        status_interviewed = $6,
        status_technical = $7,
        status_offer = $8,
        job_link = $9,
        job_salary = $10 
        WHERE id = $11`;
    const values = [
        req.body.company_name,
        req.body.job_role,
        req.body.date_applied,
        req.body.app_status,
        req.body.status_rejected,
        req.body.status_interviewed,
        req.body.status_technical,
        req.body.status_offer,
        req.body.job_link,
        req.body.job_salary
    ];
    
    pool.query(updateJob, [...values, jobId]).then((response) => {
        console.log("Updated application");
        // console.log(response);
        res.send("Job application updated: " + JSON.stringify(req.body));
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Error updating job application.");
    });
    console.log(req.body);
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