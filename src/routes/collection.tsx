import { createFileRoute, Navigate } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

export const Route = createFileRoute('/collection')({
  component: CollectionRedirect,
});

function CollectionRedirect() {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return <Navigate to="/login" />;
  }

  // Redirect to their own profile, which is where the collection lives
  return <Navigate to="/$username" params={{ username: `@${profile.username}` }} />;
}
