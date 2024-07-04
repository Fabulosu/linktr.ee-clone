import { dbConnect } from "@/utils/database";
import { LinkModel } from "@/utils/models";
import { NextRequest, NextResponse } from "next/server";

// Define the structure of the incoming request body
interface UpdateLinkOrder {
    linkId: string;
    newOrder: number;
}

interface UpdateLinkOrderRequest {
    links: UpdateLinkOrder[];
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
    try {
        // Parse the request body as an array of links with new orders
        const { links }: UpdateLinkOrderRequest = await req.json();

        console.log("Received links for update: ", links);

        await dbConnect();

        // Create bulk operations for each link update
        const bulkOps = links.map(({ linkId, newOrder }) => ({
            updateOne: {
                filter: { _id: linkId },
                update: { order: newOrder }
            }
        }));

        // Perform the bulk write operation
        await LinkModel.bulkWrite(bulkOps);

        return NextResponse.json({ success: true, message: "Links updated successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Error updating links: ", error);
        return NextResponse.json({ success: false, message: "Error updating links!" }, { status: 500 });
    }
}
