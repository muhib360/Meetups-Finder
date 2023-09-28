export async function GET() {
    return new Response(JSON.stringify({message: "Testing"}), {
        status: 200
    })
}