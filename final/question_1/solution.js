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
