const router = require("express").Router();
const Workouts = require("../models/workouts.js");

router.get("/api/workouts", (req, res) => {
  Workouts.aggregate([
    { $addFields: { totalDuration: { $sum: "$exercises.duration" } } },
  ])
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
//when posting, front end creates info to send
//data = req.body, deconstrucing an object is done by placing object in curly brackets to skip over that step
router.post("/api/workouts", (req, res) => {
  Workouts.create(req.body)
    .then((dbWorkouts) => {
      console.log("workout created");
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// db.orders.aggregate([
//   { $match: { status: "A" } },
//   { $group: { _id: "$cust_id", total: { $sum: "$amount" } } },
// ]);
// {
/* // router.post("/api/workouts", ({ body }, res) => {
//   Transaction.create(body) */
// }
//     .then((dbTransaction) =>
//       res.json(dbTransaction);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

// router.post("/api/transaction/bulk", ({ body }, res) => {
//   Transaction.insertMany(body)
//     .then((dbTransaction) => {
//       res.json(dbTransaction);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

// router.get("/api/transaction", (req, res) => {
//   Transaction.find({})
//     .sort({ date: -1 })
//     .then((dbTransaction) => {
//       res.json(dbTransaction);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });

module.exports = router;
