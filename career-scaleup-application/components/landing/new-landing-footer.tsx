"use client";

import Link from "next/link";

export function NewLandingFooter() {
  return (
    <footer className="bg-background dark:bg-black border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-foreground mb-4 text-lg">Career ScaleUp</h4>
            <p className="text-muted-foreground">
              AI-powered recruitment platform connecting talent with opportunity.
            </p>
          </div>
          <div>
            <h5 className="font-semibold text-foreground mb-4">Product</h5>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#for-seekers" className="hover:text-foreground transition">
                  For Job Seekers
                </a>
              </li>
              <li>
                <a href="#for-recruiters" className="hover:text-foreground transition">
                  For Recruiters
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-foreground transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-foreground mb-4">Company</h5>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="/about" className="hover:text-foreground transition">
                  About
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-foreground transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-foreground transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-foreground transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-foreground mb-4">Legal</h5>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="/privacy" className="hover:text-foreground transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-foreground transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/cookies" className="hover:text-foreground transition">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Career ScaleUp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

