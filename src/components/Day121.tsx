import { useState } from 'react';

// Day 121
// Bookmark List (Props and Child Component Only)

interface Bookmark {
    id: number;
    title: string;
    isFavorite: boolean;
}

interface BookmarkCardProps {
    bookmark: Bookmark;
    onToggle: (id: number) => void;
}

// Parent component
function Day121() {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([
        { id: 1, title: 'GitHub', isFavorite: true },
        { id: 2, title: 'YouTube', isFavorite: false },
        { id: 3, title: 'Reddit', isFavorite: false },
    ]);

    const handleToggle = (id: number) => {
        setBookmarks(
            bookmarks.map((bookmark) => bookmark.id === id ? 
            {...bookmark, isFavorite: !bookmark.isFavorite} : 
            bookmark)
        );
    }

    return (
        <div>
            <h2>My Bookmarks</h2>

            {bookmarks.map((bookmark) => 
                <BookmarkCard
                    key={bookmark.id}
                    bookmark={bookmark}
                    onToggle={handleToggle}
                />
            )}
        </div>
    );
}

// Child component
function BookmarkCard({ bookmark, onToggle }: BookmarkCardProps) {
    return (
        <div>
            <span>{bookmark.title}</span>
            <button onClick={() => onToggle(bookmark.id)}>{bookmark.isFavorite ? '★ Favorited' : '☆ Add to Fav'}</button>
        </div>
    );
}

export default Day121;