"use client";
import PageLayout from "#components/layouts/PageLayout";
import { Button } from "#components/ui/button";
import { Input } from "#components/ui/input";
import { useState } from "react";
import { useOpenAiMutation } from "#hooks/useOpenAiMutation";

export default function Home() {
  const [value, setValue] = useState("");

  const { trigger, data, isLoading } = useOpenAiMutation();

  const handleClick = async () => {
    if (!value) return;
    await trigger({ prompt: value });
  };

  console.log(data);

  return (
    <PageLayout>
      <div className="pt-6 pb-24 px-12">
        <h1>main content</h1>
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button type="button" onClick={handleClick} disabled={isLoading}>
          OPEN
        </Button>
      </div>
    </PageLayout>
  );
}
