import { Request, Response } from 'express';
import Alert from '../models/Alert'
import ParseFormat from '../utils/ParseFormat'
import user from '../models/user';

const parse = new ParseFormat()

class AlertController {

    // async listAlert(req: Request, res: Response) {
    //     const alerts = await Alert.find()

    //     return res.json(alerts)
    // }

    async singleAlert(req: Request, res: Response) {
        const { _id } = req.params;
        const alert = await Alert.findById(_id).populate("user", "_id name phone email")
        return res.json(alert)
    }

    async listAlerts(req: Request, res: Response) {
        const { needs, latitude, longitude } = req.query;

        const parseNeeds = parse.parseStringAsArray(String(needs))

        const alerts = await Alert.find({
            needs: {
                $in: parseNeeds
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [
                            longitude,
                            latitude
                        ]
                    },
                    $maxDistance: 10000
                }
            }
        })

        return res.json(alerts)
    }

    async createAlert(req: Request, res: Response) {
        const { user_id } = req.headers;
        const { title, description, needs, latitude, longitude } = req.body;

        const location = await {
            type: 'Point',
            coordinates: [longitude, latitude],
        }

        const alert = await Alert.create({
            title,
            description,
            needs,
            location,
            user: user_id
        })
        

        return res.json(alert)

    }

    async updateAlert(req: Request, res: Response) {

        const { user_id } = req.headers;
        const { _id, title, description, needs, latitude, longitude } = req.body;

        // const alert = await Alert.findById(_id)

        const location = await {
            type: 'Point',
            coordinates: [longitude, latitude],
        }

        const alert = await Alert.findByIdAndUpdate(_id, {
            title,
            description,
            needs
            // location,
            // user: user_id
        })

        return res.json(alert)

    }
    // async createAlert(req: Request, res: Response) {
    //     const { user_id } = req.headers;
    //     const { title, description, needs, latitude, longitude } = req.body;

    //     const location = await {
    //         type: 'Point',
    //         coordinates: [longitude, latitude],
    //     }

    //     const alert = await Alert.create({
    //         title,
    //         description,
    //         needs,
    //         location
    //     })

    //     return res.json(alert)

    // }
}

export default AlertController