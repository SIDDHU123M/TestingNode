from googlesearch import search
import requests
from bs4 import BeautifulSoup

def generate_dorks():
    return [
        'inurl:"/checkout/session" "stripe"',
        'inurl:"/create-checkout-session" "stripe"',
        'intitle:"Donate" inurl:"checkout"',
        'intitle:"Donation" inurl:"checkout"',
        'inurl:"/pay" "stripe"',
        'inurl:"/success" "stripe checkout"',
        '"powered by Stripe" inurl:"checkout"',
        '"stripe.com/docs/payments/checkout"',
        'inurl:"/payment/stripe/" "checkout"',
        '"checkout.stripe.com" intext:"Enter your payment details"'
    ]

def fetch_search_results(query):
    return [url for url in search(query, num_results=10, lang="en")]

def check_url_accessibility(url):
    try:
        response = requests.get(url, timeout=5)
        return response.status_code == 200, response.text
    except requests.RequestException:
        return False, None

def validate_payment_page(html_content):
    if not html_content:
        return False
    soup = BeautifulSoup(html_content, "html.parser")
    
    # Look for common phrases or buttons indicating a payment or donation page
    keywords = ["donate", "payment", "checkout", "proceed to payment", "pay with stripe"]
    button_text = soup.find_all("button")
    for button in button_text:
        if any(keyword in button.text.lower() for keyword in keywords):
            return True
    
    # Look for specific Stripe payment forms or elements
    if "checkout.stripe.com" in html_content or "stripe.com/payments" in html_content:
        return True
    return False

def main():
    dorks = generate_dorks()
    valid_payment_links = {}

    for dork in dorks:
        print(f"\nSearching for dork: {dork}\n")
        result_links = fetch_search_results(dork)
        
        for link in result_links:
            is_accessible, page_content = check_url_accessibility(link)
            if is_accessible and validate_payment_page(page_content):
                valid_payment_links[link] = dork
                print(f"Valid Payment Page: {link}")
            else:
                print(f"Ignored: {link}")

    print("\nValid Payment Pages Summary:")
    for link, dork in valid_payment_links.items():
        print(f"Dork: {dork} => {link}")

if __name__ == "__main__":
    main()



