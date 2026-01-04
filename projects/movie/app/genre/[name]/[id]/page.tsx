// app/genre/[name]/[id]/page.tsx
export default async function Genre({
    params,
}: {
    params: Promise<{ id: string; name: string }>;
}) {
    const { id, name } = await params;

    return (
        <div>
            <h2>
                {name}-{id}
            </h2>
        </div>
    );
}
