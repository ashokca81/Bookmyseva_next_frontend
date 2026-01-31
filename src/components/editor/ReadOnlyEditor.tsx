
const ReadOnlyEditor = ({ content }: { content: string | object | null }) => {
    return (
        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
            {/* Placeholder for editor content rendering */}
            {typeof content === 'string' ? <div dangerouslySetInnerHTML={{ __html: content }} /> : JSON.stringify(content)}
        </div>
    );
};

export default ReadOnlyEditor;
