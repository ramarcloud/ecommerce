const dataSchema = require("../models/user");
const productSchema = require("../models/product")
const crypto = require('../common/crypto')

exports.userCreate = async (req, res) => {
    try {
        const info = req.body
        const password = info.password;
        const phone_number = info.phone_number;
        const phoneNumber = phone_number.toString();
        const minLength = 8;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const digitRegex = /\d/;
        const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
        const isLengthValid = password.length >= minLength;
        const isPhonenoValid = phoneNumber.length >= 10;
        const hasUppercase = uppercaseRegex.test(password);
        const hasLowercase = lowercaseRegex.test(password);
        const hasDigit = digitRegex.test(password);
        const hasSpecialCharacter = specialCharacterRegex.test(password);
        const isValid = isLengthValid && hasUppercase && hasLowercase && hasDigit && hasSpecialCharacter;
        if (isValid) {
            if (isPhonenoValid) {
                const data = {
                    name: info.name,
                    email: info.email,
                    password: crypto.encrypt(info.password),
                    phone_number: info.phone_number,
                    position: info.position,
                    department: info.department
                }
                dataSchema.findOne({ email: info.email }).then(async(result) => {
                    if (result) {
                        res.json({ code: 200, status: true, msg: "User Email already Exits" })
                    } else {
                        dataSchema.create(data).then(async resp => {
                            const user = await dataSchema.findOne({'email':info.email})
                            var jwtData = { _id: user._id, name: user.name, email:user.email };
                            if (resp) {
                                const token = crypto.createPayload(jwtData)
                                res.json({ code: 200, status: true, msg: "User added sucessfully",data:resp, token: token })
                            } else {
                                res.json({ code: 400, status: true, msg: "Something went wrong" })
                            }
                        }).catch((err) => {
                            res.json({ code: 400, status: false, msg: err.message })
                        })
                    }
                }).catch((error) => {
                    res.json({ code: 400, status: false, msg: error.message })
                })
            } else {
                res.json({ code: 400, status: false, msg: "Enter valid phone number" })
            }
        } else {
            res.json({ code: 400, status: false, msg: "Enter strong password" })
        }
    } catch (catchError) {
        res.json({ code: 400, status: true, msg: catchError.message })
    }
}


exports.product_list = async(req, res) =>{
try{
    const search = req.body.search;
    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 10;     
        var transactions = await productSchema
          .find({ product_name: { $regex: search, $options: "i" } })
          .sort({ _id: -1 })
          .skip((page - 1) * limit)
          .limit(limit);
          res.json({code:200, status: true, data: transactions})
}catch(e){
    res.json({code:400, status: false, masg: e.message})
}
}

