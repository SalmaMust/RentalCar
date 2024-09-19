import av1 from '../assets/images/av1.png'; 
import av3 from '../assets/images/av3.jpg'; 
import av4 from '../assets/images/av4.png'; 


export default function Component() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid max-w-5xl gap-6 px-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <img
              src={av1}
              width={64}
              height={64}
              alt="Avatar"
              className="h-16 w-16 rounded-full object-cover"
              style={{ aspectRatio: "64/64", objectFit: "cover" }}
            />
            <div>
              <p className="text-sm font-medium">Jane Doe</p>
              <p className="text-sm text-muted-foreground">CEO, Acme Inc.</p>
            </div>
          </div>
          <blockquote className="mt-6 text-lg font-medium leading-relaxed">
            "The platform has been a game-changer for our team. It's\n streamlined our development workflow and allowed
            us to ship\n features faster than ever before."
          </blockquote>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <img
              src={av3}
              width={64}
              height={64}
              alt="Avatar"
              className="h-16 w-16 rounded-full object-cover"
              style={{ aspectRatio: "64/64", objectFit: "cover" }}
            />
            <div>
              <p className="text-sm font-medium">John Smith</p>
              <p className="text-sm text-muted-foreground">Lead Developer, Acme Inc.</p>
            </div>
          </div>
          <blockquote className="mt-6 text-lg font-medium leading-relaxed">
            "I've been using this platform for over a year now, and it's\n been an absolute game-changer. The ease of
            use and the\n powerful features have made my job so much easier."
          </blockquote>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <img
              src={av4}
              width={64}
              height={64}
              alt="Avatar"
              className="h-16 w-16 rounded-full object-cover"
              style={{ aspectRatio: "64/64", objectFit: "cover" }}
            />
            <div>
              <p className="text-sm font-medium">Sarah Johnson</p>
              <p className="text-sm text-muted-foreground">Product Manager, Acme Inc.</p>
            </div>
          </div>
          <blockquote className="mt-6 text-lg font-medium leading-relaxed">
            "This platform has been a lifesaver for our team. The\n seamless integration with our existing tools and
            the\n intuitive interface have made our lives so much easier."
          </blockquote>
        </div>
      </div>
    </section>
  )
}