const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      orderItems: [
        {
          name: { type: String, required: true },
          qty: { type: Number, required: true },
          price: { type: Number, required: true },
        },
      ],
      paymentMethod: { type: String, required: true },
      totalPrice: { type: Number, required: true },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Order", orderSchema);
  