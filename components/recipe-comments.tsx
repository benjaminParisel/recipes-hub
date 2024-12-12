'use client';

import { useState } from 'react';
import { Comment } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore } from '@/lib/auth-store';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface RecipeCommentsProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
}

export function RecipeComments({ comments, onAddComment }: RecipeCommentsProps) {
  const [newComment, setNewComment] = useState('');
  const { user } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    onAddComment(newComment);
    setNewComment('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Commentaires</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Ajoutez votre commentaire..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px]"
        />
        <Button type="submit" disabled={!newComment.trim()}>
          Publier le commentaire
        </Button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-card p-4 rounded-lg border space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{comment.authorName}</span>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(comment.createdAt, {
                  addSuffix: true,
                  locale: fr,
                })}
              </span>
            </div>
            <p className="text-card-foreground">{comment.text}</p>
          </div>
        ))}

        {comments.length === 0 && (
          <p className="text-center text-muted-foreground py-6">
            Aucun commentaire pour le moment. Soyez le premier à commenter !
          </p>
        )}
      </div>
    </div>
  );
}