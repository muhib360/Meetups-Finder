'use client'

import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { useRouter } from 'next/navigation';

export const metadata = {
    title: 'description',
    description: 'add your own meetups and create amazing netword opportunities.'
}

export default function NewMeetup() {
    const router = useRouter();

    async function addMeetupHandler(enteredData) {
        await fetch('/api/new-meetup', {
            method: "POST",
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        router.replace('/')
    }

    return (
        <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    )
}