// app/view/[id]/[title]/page.tsx
export default async function View({
    params,
}: {
    params: Promise<{ id: number; title: string }>;
}) {
    const { id, title } = await params;

    return (
        <div>
            <h2>
                {decodeURIComponent(title)} - {id}
            </h2>
        </div>
    );
}
