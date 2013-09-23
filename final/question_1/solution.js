/*
 * Solution to Question #1 of M101J Final Exam.
 *
 * Author: Adam Brightwell
 * Date:   September 10, 2013
 *
 * Construct a query to calculate the number of messages sent by 
 * Andrew Fastow, CFO, to Jeff Skilling, the president. Andrew Fastow's 
 * email addess was andrew.fastow@enron.com. Jeff Skilling's email was 
 * jeff.skilling@enron.com. 
 */

use enron

db.messages.aggregate([
  {$match: {"headers.From": "andrew.fastow@enron.com" }},
  {$project:
    {
      to: "$headers.To",
      from: "$headers.From"
    }
  },
  {$unwind: "$to"},
  {$group:
    {
      _id: {to: "$to", from: "$from}"},
      count: {$sum: 1}
    }
  }
]);
