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
//ask Anna about this
router.put("/api/workouts/:id", (req, res) => {
  Workouts.findByIdAndUpdate(req.params.id)
    .then((dbWorkouts) => {
      console.log("workout updated");
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// const router = require("express").Router();
// const Transaction = require("../models/transaction.js");

// router.post("/api/transaction", ({ body }, res) => {
//   Transaction.create(body)
//     .then((dbTransaction) => {
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
