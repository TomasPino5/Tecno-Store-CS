const Ratings = require("../models/ratings.js");

const modifyUserRating = async (req, res) => {
    const { email, productId } = req.query;
    const { rating } = req.body;
    console.log(email, productId)
    console.log(rating)
    try {
        const ratings = await Ratings.findOne({ where: { user: email, productId: productId } });
        if (!ratings) {
            return res.status(404).json({ message: 'Calificación no encontrada' });
        }

        ratings.rating = rating;
        await ratings.save();
        res.status(200).send('Se ha actualizado la calificación');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Hubo un error al actualizar la calificación' });
    }
}

module.exports = modifyUserRating;


// const Ratings = require("../models/ratings.js");

// const modifyUserRating = async (req, res) => {
//     const { email, productId } = req.query;
//     const { rating } = req.body;

//     try {
//         const ratings = await Ratings.findOne({ where: { user: email, productId: productId } });
//         if (!ratings) {
//             return res.status(404).json({ message: 'Calificación no encontrada' });
//         }

//         ratings.rating = Number(rating);
//         await ratings.save();
//         res.status(200).send('Se ha actualizado la calificación');
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Hubo un error al actualizar la calificación' });
//     }
// }

// // const modifyUserRating = async (req, res) => {
// //     const { email, productId } = req.query;
// //     const { rating } = req.body;
    
// //     const ratings = await Ratings.findOne({ where: { user: email, productId: productId } })
// //     const id = ratings.id
    
// //     try {
// //         const r = await Ratings.findByPk(id);
// //         //ratings.user = email
// //         //ratings.productId = Number(productId)
// //         r.rating = Number(rating)
// //         await ratings.save();
// //         res.status(200).send('Se ha actualizado la calificacion')
// //     } catch (error) {
// //         res.status(500).json({ message: 'Hubo un error al actualizar la calificacion' })
// //     }
// // }

// module.exports = modifyUserRating