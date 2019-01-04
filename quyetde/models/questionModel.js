const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema ({  // dạng class
    content: { type: String, required: true },  // required: true là trường bắt buộc. unique: true content này là duy nhất. 
    yes: { type: Number, default: 0},
    no: { type: Number, default: 0} // để default là 0
}, {
    //_id: false
    timestamps: true // tạo ra 2 trường createdAt và updatedAt
});

module.exports = mongoose.model("Question", QuestionSchema);