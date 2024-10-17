"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock quotes data
const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein",
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    text: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James",
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    text: "You only live once, but if you do it right, once is enough.",
    author: "Mae West",
  },
  {
    text: "Manpower without unity is not a strength unless it is harmonized and united properly, then it becomes a spiritual power.",
    author: "Sardar Vallabhbhai Patel",
  },
  {
    text: "They may kill me, but they cannot kill my ideas. They can crush my body, but they will not be able to crush my spirit.",
    author: "Bhagat Singh",
  },
  {
    text: "Each one of us has both good and evil virtues. Those who decide to focus on the good ones succeed in life.",
    author: "Narendra Modi",
  },
  {
    text: "Every citizen of India must remember that he is an Indian and he has every right in this country but with certain duties.",
    author: "Sardar Vallabhbhai Patel",
  },
  {
    text: "Revolution is an inalienable right of mankind. Freedom is an imperishable birthright of all.",
    author: "Bhagat Singh",
  },
  {
    text: "Good governance with good intentions is the hallmark of our government. Implementation with integrity is our core passion.",
    author: "Narendra Modi",
  },
];

export function QuotePost() {
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(
    null
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [post, setPost] = useState<{ title: string; content: string } | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
      setContent(randomQuote.text);
    } catch (err) {
      setError("Failed to fetch quote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const createPost = () => {
    if (!title.trim() || !content.trim()) {
      setError("Please provide both title and content for the post.");
      return;
    }
    setPost({ title, content });
    setError(null);
  };

  return (
    <div className="max-w-md mx-auto space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Quote Generator</CardTitle>
        </CardHeader>
        <CardContent>
          {quote && (
            <blockquote className="border-l-4 border-primary pl-4 italic">
              <p>{quote.text}</p>
              <footer className="text-right">— {quote.author}</footer>
            </blockquote>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={fetchRandomQuote} disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Get Random Quote"
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter post content"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={createPost}>Create Post</Button>
        </CardFooter>
      </Card>

      {post && (
        <Card>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
