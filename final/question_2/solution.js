//
// Solution to Question #2 of M101J Final Exam.
// 
//  Author: Adam Brightwell
//  Date:   September 10, 2013
//

use enron

db.messages.aggregate([
  {$project:
    {
      to: "$headers.To",
      from: "$headers.From"
    }
  },
  {$unwind: "$to"},
  {$group:
    {
      _id: {_id: "$_id", to: "$to", from: "$from"}
    }
  },
  {$group:
    {
      _id: {to: "$_id.to", from: "$_id.from"},
      count: {$sum: 1}
    }
  },
  {$sort: {count: -1}},
  {$limit: 5}
]);
