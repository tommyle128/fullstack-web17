

const muaRau = (tien) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (tien >= 1000) {
                cb("Rau");
            } else {
                return "Chong du tien roi noi chuyen";
                cb("Chong du tien roi noi chuyen");
            }
        }, 1000);
        }
    });
}

muaRau(10000)
    .then((result) => {
        console.log(result);
        return muaRau(9999);
    })
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log("Loi", err);
    })