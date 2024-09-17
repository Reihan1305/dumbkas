import prisma from "../lib/prisma"

export default new class walletService{

    async createWallet(userId:string){
        try {
            const user = await prisma.user.findFirst({where:{id:userId},include:{wallet:true}})

            if(!user){
                throw new Error ("user not found")
            }

            if(user.wallet){
                return "you alredy have wallet"
            }

            await prisma.wallet.create({
                data:{
                    userId:userId,
                    totalAmount:0
                }
            })

            return "wallet created"
        } catch (error) {
            const err = error as Error
            throw new Error(err.message)
        }
    }
}