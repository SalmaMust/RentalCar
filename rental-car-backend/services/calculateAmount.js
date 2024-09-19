const Voiture = require('../models/voiture.model');  // Import the model

// Add the method to the schema's methods property
Voiture.schema.methods.calculateTotalAmount = function(days, hours) {
    const pricePerHour = this.pricePerDay * 0.2; // 20% of the daily price
    let totalDays = days;

    // Add extra day for every 5 hours
    if (hours > 5) {
        const extraDays = Math.ceil((hours - 5) / 24); // Each extra 24 hours = 1 extra day
        totalDays += extraDays;
    }

    const totalAmount = (totalDays * this.pricePerDay) + (hours * pricePerHour);
    const amountWithTax = totalAmount * (1 + this.tax_fees);

    return amountWithTax;
};
