
const config = {
    port: parseInt(process.env.PORT, 10) || 3000,
    jwt:{
        access:{
            secret:process.env.JWT_SECRET_KEY,
            expiresIn:'15m'
        },
        refresh:{
            secret: process.env.JWT_REFRESH_SECRET_KEY,
            expiresIn:'7d'
        }
    },

    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432
    },

    aws:{
        bucket:{
            name: process.env.BUCKET_NAME,
            region: process.env.BUCKET_REGION
        },
        credentials:{
            accessKey: process.env.AWS_SECRET_ACCESS_KEY,
            secretKey: process.env.AWS_ACCESS_KEY_ID
        }
    }
}

export default () => config
export type ConfigType = typeof config