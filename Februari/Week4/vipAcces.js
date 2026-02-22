const user = {
    id: 1,
    profile: {
        name: "Figo",
        membership: {
            type: "Platinum",
            isActive: true
        }
    }
};

// ??? : Akses properti isActive di dalam membership
const status = user.membership.type.isActive;

if (status) {
    console.log("Welcome VIP!");
}