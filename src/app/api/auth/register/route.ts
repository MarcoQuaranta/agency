import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Email non valida'),
  password: z.string().min(6, 'Password deve essere almeno 6 caratteri'),
  name: z.string().min(2, 'Nome deve essere almeno 2 caratteri'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const validatedData = registerSchema.parse(body);
    
    const user = await registerUser(
      validatedData.email,
      validatedData.password,
      validatedData.name
    );

    return NextResponse.json(
      { message: 'Registrazione completata', user },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}