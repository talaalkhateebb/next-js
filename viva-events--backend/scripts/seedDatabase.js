const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Service = require('../models/Service');

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        console.log(' Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(' MongoDB Connected');

        // Clear existing data (optional - comment out if you want to keep existing data)
        console.log('  Clearing existing data...');
        await User.deleteMany({});
        await Service.deleteMany({});
        console.log(' Existing data cleared');

        // Create Admin User
        console.log(' Creating admin user...');
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@vivaevents.com',
            password: hashedPassword,
            phone: '+962790055163',
            role: 'admin'
        });
        console.log('Admin user created (email: admin@vivaevents.com, password: admin123)');

        // Create Sample Services
        console.log(' Creating sample services...');
        const services = await Service.insertMany([
            {
                title: 'Gold Wedding Package',
                subtitle: 'Complete luxury wedding setup',
                description: 'Includes venue decoration, catering for 200 guests, photography, and entertainment. Everything you need for your perfect day.',
                price: 5000.00,
                currency: 'JOD',
                category: 'wedding',
                isActive: true
            },
            {
                title: 'Silver Wedding Package',
                subtitle: 'Elegant wedding essentials',
                description: 'Venue decoration, catering for 100 guests, basic photography. Beautiful and affordable.',
                price: 3000.00,
                currency: 'JOD',
                category: 'wedding',
                isActive: true
            },
            {
                title: 'Birthday Party Package',
                subtitle: 'Memorable birthday celebration',
                description: 'Decoration, entertainment, catering for 50 guests. Make your birthday unforgettable.',
                price: 1500.00,
                currency: 'JOD',
                category: 'birthday',
                isActive: true
            },
            {
                title: 'Corporate Event Package',
                subtitle: 'Professional business event',
                description: 'Conference setup, AV equipment, catering. Perfect for meetings and seminars.',
                price: 2500.00,
                currency: 'JOD',
                category: 'corporate',
                isActive: true
            },
            {
                title: 'Chair Rental - White',
                subtitle: 'Premium white chairs',
                description: 'Elegant white chairs for any event. Comfortable and stylish.',
                price: 5.00,
                currency: 'JOD',
                category: 'rental',
                isActive: true
            },
            {
                title: 'Table Rental - Round',
                subtitle: 'Round banquet tables',
                description: 'Perfect for weddings and parties. Seats 8-10 people comfortably.',
                price: 15.00,
                currency: 'JOD',
                category: 'rental',
                isActive: true
            },
            {
                title: 'Engagement Party Package',
                subtitle: 'Romantic engagement celebration',
                description: 'Beautiful decoration, catering, and entertainment for your special announcement.',
                price: 2000.00,
                currency: 'JOD',
                category: 'wedding',
                isActive: true
            },
            {
                title: 'Kids Party Package',
                subtitle: 'Fun-filled kids celebration',
                description: 'Games, entertainment, decorations, and catering for 30 children.',
                price: 800.00,
                currency: 'JOD',
                category: 'birthday',
                isActive: true
            }
        ]);
        console.log(` ${services.length} sample services created`);

        console.log('\n Database seeding completed successfully!\n');
        console.log(' Summary:');
        console.log('   - Database: viva_events');
        console.log('   - Collections: users, services, carts, orders');
        console.log('   - Admin user: admin@vivaevents.com / admin123');
        console.log(`   - Sample services: ${services.length} items added\n`);

        process.exit(0);

    } catch (error) {
        console.error(' Error seeding database:', error);
        process.exit(1);
    }
};

// Run seeding
seedDatabase();
