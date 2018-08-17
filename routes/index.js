const express = require("express");
const router = express.Router();
const mysql = require("mysql");

let data;
let stuId, proId, supId, nSql, msg;
// Create Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "beproject",
    multipleStatements: true
});

//Connect
db.connect(err => {
    if (err) {
        console.log(err);
    }
    console.log("MySQL connected...");
});

//Queries
query =
    "SELECT * FROM supervisor;SELECT * FROM Category; " +
    "SELECT * FROM batch; SELECT * FROM Student;" +
    "SELECT P.Project_idProject, GROUP_CONCAT(DISTINCT(S.name)SEPARATOR ',') AS studentName,GROUP_CONCAT(DISTINCT(S.Programme_name)) AS program ,P2.name AS projectName, GROUP_CONCAT(DISTINCT(S.roll_no)) AS studentRoll, S2.name AS supervisorName,S2.Title AS title, GROUP_CONCAT(DISTINCT(B.year)) AS year, GROUP_CONCAT(DISTINCT(Category.Category_name)) AS category FROM Project_has_Student P INNER JOIN Student S on P.Student_idStudent = S.idStudent " +
    "INNER JOIN Project P2 on P.Project_idProject = P2.idProject " +
    "INNER JOIN Project_has_Category Category on P2.idProject = Category.Project_idProject " +
    "INNER JOIN Supervisor S2 on P2.Supervisor_idInstructor = S2.idInstructor " +
    "INNER JOIN Batch B on S.Batch_batch_no = B.year GROUP BY P.Project_idProject; ";

db.query(query, (err, result) => {
    if (err) console.log(err);
    else {
        data = result;
    }
});

/* GET home page. */
studentQuery =
    "SELECT * FROM student;SELECT * FROM Supervisor;SELECT * FROM Project;SELECT * FROM programme;SELECT * FROM batch;SELECT * FROM Category;";
router.get("/studentDisplay", (req, res, next) => {
    db.query(studentQuery, (err, results) => {
        if (err) console.log(err);
        console.log("data received from Student Table: ");
        res.send(results);
    });
});

//ADD NEW STUDENT
router.post("/newStudent", (req, res) => {
    console.log(req.body);
    let q = `INSERT INTO batch(year) VALUES ('${req.body.batch}')`;
    db.query(q, (err, result) => {
    });
    let q1 =
        `INSERT INTO student (name, Batch_batch_no, roll_no, Programme_name) VALUES('${req.body.name}','${req.body.batch}','${req.body.roll}','${req.body.programme}')`;
    db.query(q1, function (err, result) {
        if (err) console.log(err);
        res.send(data);

    });
    console.log(req.body);
});

//EDIT STUDENT
router.post("/editStudent", (req, res) => {
    console.log(req.body);
    let edit =
        "UPDATE student SET name = '" +
        req.body.name +
        "',Batch_batch_no = '" +
        req.body.batch +
        "',roll_no = '" +
        req.body.roll +
        "',Programme_name = '" +
        req.body.programme +
        "' WHERE idStudent = '" +
        req.body.id +
        "'";
    db.query(edit, (err, result) => {
        if (err) console.log(err);
        res.send(data);
    });
});

//DELETE STUDENT
router.post("/deleteStudent", (req, res) => {
    console.log(req.body.id);
    let sql = `DELETE FROM student WHERE idStudent ='${req.body.id}'`;
    db.query(sql, (err, result, fields) => {
        if (err) {
            msg = "Failed";
            res.send(JSON.stringify({result: msg}));
        }
        else {
            res.send(data);
        }
    });
});

//queries
disp = "SELECT * FROM student;";

//load queries
//select query to display
router.get("/display", (req, res, next) => {
    db.query(disp, (err, results) => {
        if (err) console.log(err);
        console.log("data extracted from database:\n");
        res.send(JSON.stringify(results));
    });
});

router.get("/displayProject", (req, res, next) => {
    db.query("SELECT * FROM project", (err, results) => {
        if (err) console.log(err);
        console.log("data received from Project Table: ");
        res.send(results);
    });
});

router.use("/newProject", (req, res, next) => {
    console.log(req.body);
    //let sql = `INSERT INTO year_completed (year) VALUES('${req.body.year}')`;
    /*db.query(sql, function (err, result) {
        if (err) console.log(err);
    });*/
    let q2 =
        `INSERT INTO project (name) VALUES('${req.body.name}');
    /*UPDATE project
    SET YearCompleted_year='${req.body.year}'
    WHERE name='${req.body.name}';*/
    `;
    db.query(q2, function (err, result) {
        if (err) console.log(err);
        res.send(data);

    });
});

//EDIT PROJECT
router.post("/editProject", (req, res) => {
    console.log(req.body);
    let edit =`UPDATE project SET name='${req.body.name}'
WHERE idProject = ${req.body.id}`;
    db.query(edit, (err, result, fields) => {
        if (err) console.log(err);
        res.send(data);
    });
});

//DELETE PROJECT
router.post("/deleteProject", (req, res) => {
    console.log(req.body.id);
    let sql = "DELETE FROM project WHERE idProject =" + "'" + req.body.id + "'";
    db.query(sql, (err, result, fields) => {
        if (err) console.log(err);
        else res.send(data)
    });
});

router.post("/delete", (req, res) => {
    let sql = `UPDATE project
SET Supervisor_idInstructor = NULL 
WHERE idProject=${req.body.id};DELETE FROM project_has_student
WHERE Project_idProject=${req.body.id};DELETE FROM project_has_category
WHERE Project_idProject=${req.body.id}`;
    db.query(sql, (err, result) => {
        if (err) console.log(err);
        res.send(data);

    });
    db.query(query, (err, result) => {
        if (err) console.log(err);
        else {
            data = result;
        }
    });
});

//GET SUPERVISOR
router.get("/displaySupervisor", (req, res, next) => {
    db.query("SELECT * FROM supervisor", (err, results) => {
        if (err) console.log(err);
        console.log("data received from Supervisor Table: ");
        res.send(results);
    });
});

//ADD SUPERVISOR
router.post("/newSupervisor", (req, res, next) => {
    console.log("1 NEW Supervisor has been added");
    let q2 = `INSERT INTO supervisor (name, Title) VALUES('${req.body.name}','${req.body.designation}')`;
    db.query(q2, function (err, result) {
        if (err) console.log(err);
        res.send(data);

    });
    console.log(req.body);
});

//EDIT SUPERVISOR
router.post("/editSupervisor", (req, res) => {
    console.log(req.body);
    let edit =
        `UPDATE supervisor SET name = ('${req.body.name}'), Title=('${req.body.designation}')
        WHERE idInstructor = ('${req.body.id}')`;
    db.query(edit, (err, result, fields) => {
        if (err) console.log(err);
    });
    res.send(data);
});

//DELETE SUPERVISOR
router.post("/deleteSupervisor", (req, res) => {
    console.log(req.body.id);
    let sql =
        "DELETE FROM supervisor WHERE idInstructor =" + "'" + req.body.id + "'";
    db.query(sql, (err, result, fields) => {
        if (err) {
            msg = "Failed";
            res.send(JSON.stringify({result: msg}));
        }
        else {
            res.send(data);
        }
    });
});

router.get("/selection", function (req, res) {
    //console.log(data);
    res.send(data);
});

//Check for the queries
router.get("/simple", function (req, res, next) {
    res.locals.connection.query(`SELECT * from project_has_category`, function (
        err,
        results,
        fields
    ) {
        if (err) console.log(err);
        res.send(JSON.stringify(results));
    });
});

//studentProject
router.post("/studentProjectAdd", (req, res) => {
    if (req.body.name1 === req.body.name2 || req.body.name1 === req.body.name3 || req.body.name1 === req.body.name4 || req.body.name2 === req.body.name3 || req.body.name2 === req.body.name4 || req.body.name3 === req.body.name4) {
        res.send(JSON.stringify({result: "Duplicate Name"}))
    }
    else {
        let sql = `SELECT idStudent FROM student WHERE name IN ('${
            req.body.name1
            }','${req.body.name2}','${req.body.name3}','${
            req.body.name4
            }');SELECT idProject FROM project
WHERE name='${req.body.project}';SELECT idInstructor FROM supervisor
WHERE name='${req.body.supervisor}'`;
        db.query(sql, (err, result) => {
            if (err) console.log(err);
            stuId = result[0];
            proId = result[1];
            supId = result[2];
            if (req.body.n === 3) {
                nSql = `INSERT INTO project_has_student(Project_idProject, Student_idStudent)
    VALUES ('${proId[0].idProject}','${stuId[0].idStudent}'),('${
                    proId[0].idProject
                    }','${stuId[1].idStudent}'),('${proId[0].idProject}','${
                    stuId[2].idStudent
                    }');UPDATE project
SET Supervisor_idInstructor=${supId[0].idInstructor}
WHERE idProject=${proId[0].idProject};`;
            } else {
                nSql = `INSERT INTO project_has_student(Project_idProject, Student_idStudent)
    VALUES ('${proId[0].idProject}','${stuId[0].idStudent}'),('${
                    proId[0].idProject
                    }','${stuId[1].idStudent}'),('${proId[0].idProject}','${
                    stuId[2].idStudent
                    }'),('${proId[0].idProject}','${stuId[3].idStudent}');UPDATE project
SET Supervisor_idInstructor=${supId[0].idInstructor}
WHERE idProject=${proId[0].idProject};`;
            }
            db.query(nSql, (err, result) => {
                if (err) msg = "Some Data Already Linked";
                else msg = "Success";
                res.send(JSON.stringify({result: msg}));
            });
            for (let i = 0; i < req.body.category.length; i++) {
                db.query(`INSERT INTO project_has_category(Project_idProject, Category_name) VALUES ('${proId[0].idProject}','${req.body.category[i]}')`,
                    (err, result) => {
                        if (err) console.log(err);
                        else console.log(result);
                    })
            }
            db.query(query, (err, result) => {
                if (err) console.log(err);
                else {
                    data = result;
                }
            });
        });
    }
});


router.post("/studentProjectEdit", (req, res) => {
    if (req.body.name1 === req.body.name2 || req.body.name1 === req.body.name3 || req.body.name1 === req.body.name4 || req.body.name2 === req.body.name3 || req.body.name2 === req.body.name4 || req.body.name3 === req.body.name4) {
        res.send(JSON.stringify({result: "Duplicate Name"}))
    }
    else {
        let sql =
            `UPDATE project SET Supervisor_idInstructor = NULL WHERE idProject=${req.body.id};
SELECT idStudent FROM student WHERE name IN ('${req.body.name1}','${req.body.name2}','${req.body.name3}','${req.body.name4}');
SELECT idProject FROM project WHERE name='${req.body.project}';
SELECT idInstructor FROM supervisor WHERE name='${req.body.supervisor}';
DELETE FROM project_has_category WHERE Project_idProject=${req.body.id};
DELETE FROM project_has_student WHERE Project_idProject=${req.body.id}`;
        db.query(sql, (err, result) => {
                stuId = result[1];
                proId = result[2];
                supId = result[3];
                console.log(stuId);
                if (req.body.n === 3) {
                    nSql = `INSERT INTO project_has_student(Project_idProject, Student_idStudent) VALUES ('${proId[0].idProject}','${stuId[0].idStudent}'),('${proId[0].idProject}','${stuId[1].idStudent}'),('${proId[0].idProject}','${stuId[2].idStudent}');
UPDATE project SET Supervisor_idInstructor=${supId[0].idInstructor} WHERE idProject=${proId[0].idProject}`;
                } else {
                    nSql = `INSERT INTO project_has_student(Project_idProject, Student_idStudent)
    VALUES ('${proId[0].idProject}','${stuId[0].idStudent}'),('${
                        proId[0].idProject
                        }','${stuId[1].idStudent}'),('${proId[0].idProject}','${
                        stuId[2].idStudent
                        }'),('${proId[0].idProject}','${stuId[3].idStudent}');UPDATE project
SET Supervisor_idInstructor=${supId[0].idInstructor}
WHERE idProject=${proId[0].idProject}`;
                }
                for (let i = 0; i < req.body.category.length; i++) {
                    db.query(`INSERT INTO project_has_category(Project_idProject, Category_name) VALUES ('${proId[0].idProject}','${req.body.category[i]}')`,
                        (err, result) => {
                            if (err) console.log(err);
                            else console.log(result);
                        })
                }
                db.query(nSql, (err) => {
                    if (err) msg = "Some Data Already Linked";
                    else msg = "Success";
                    res.send(JSON.stringify({result: msg}));
                });
                db.query(query, (err, result) => {
                    if (err) console.log(err);
                    else {
                        data = result;
                    }
                });
        });
    }
});


//GET CATEGORY
router.get("/displayCategory", (req, res, next) => {
    db.query(`SELECT * FROM category`, (err, results) => {
        if (err) console.log(err);
        console.log("data received from Category Table: ");
        res.send(results);
    });
});

//ADD CATEGORY
router.post("/newCategory", (req, res, next) => {
    console.log("1 NEW Category has been added");
    let q2 = `INSERT INTO category (name) VALUES('${req.body.name}')`;
    db.query(q2, function (err, result) {
        if (err) console.log(err);
        res.send(data);

    });
    console.log(req.body);
});

//EDIT CATEGORY
router.post("/editCategory", (req, res) => {
    console.log(req.body);
    let edit = `UPDATE category SET name = '${req.body.name}'
    WHERE name='${req.body.prev}'`;
    db.query(edit, (err, result, fields) => {
        if (err) console.log(err);
        res.send(data);
    });
});

//DELETE CATEGORY
router.post("/deleteCategory", (req, res) => {
    console.log(req.body.name);
    let sql = "DELETE FROM category WHERE name =" + "'" + req.body.name + "'";
    db.query(sql, (err, result, fields) => {
        if (err) console.log(err);
        res.send(data);
    });
});

module.exports = router;
