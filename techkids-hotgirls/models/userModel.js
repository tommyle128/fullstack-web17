const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;



const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { 
        type: String,
        required: true ,
        validate: {
            validator: function(v) {
                if (v.length < 10) return false
                else return true;
            
            },
            message: props => "Password is too short!!"
        },
    },
    avatar: { type: String, required: true },
});

UserSchema.pre("save", function(next) {
    console.log(this);
    const { password } = this;
 
    if (this.isModified("password"))  {
        const salt = bcrypt.genSaltSync(12);
        this.password = bcrypt.hashSync(password, salt);
    }
    next();
});


module.exports = mongoose.model("user", UserSchema);