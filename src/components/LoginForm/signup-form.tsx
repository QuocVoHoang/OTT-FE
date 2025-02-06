import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { registerUser } from "@/lib/service/auth"
import { Mail, Phone } from 'lucide-react'
import { useRouter } from "next/navigation"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()

  const createUserByEmail = async( email: string, password: string) => {
    try {
      const data: any = {};
      if (email && password) {
        data.email = email;
        data.password = password;
      }
      const response = await registerUser(data.email, data.password)
      router.push("/")
    } catch (error) {
    }
  }

  const [formData, setFormData] = useState({
      email: "",
      password: "",
      confirmPassword: ""
    })
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if(formData.confirmPassword == formData.password) {
        createUserByEmail(formData.email, formData.password)
      }
    }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Register</h1>
                <p className="text-balance text-muted-foreground">
                  Fill in the form to create an account.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  name="password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>

              {/* <div className="grid grid-cols-2 gap-4 mt-[20px] px-[20px]">
                <Button variant="outline" className={`w-full ${!isPhoneMethod && "bg-myPrimary"} hover:bg-myPrimaryHover`} type="button"
                  onClick={() => setIsPhoneMethod(false)}
                >
                  <Mail />
                  <span className="sr-only">Login with Email</span>
                </Button>
                <Button variant="outline" className={`w-full ${isPhoneMethod && "bg-myPrimary"} hover:bg-myPrimaryHover`} type="button"
                  onClick={() => setIsPhoneMethod(true)}
                >
                  <Phone />
                  <span className="sr-only">Login with Phone number</span>
                </Button>
              </div> */}
            
              <Button type="submit" className="w-full">
                Signup
              </Button>
              <div className="text-center text-sm">
                You have an account?{" "}
                <a href="/signin" className="underline underline-offset-4">
                  Signin
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
