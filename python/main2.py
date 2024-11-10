from googlesearch import search
import requests
from bs4 import BeautifulSoup

def generate_dorks():
    keywords = [
        'inurl:"/checkout/session" "stripe"',
        'inurl:"/create-checkout-session" "stripe"',
        'intitle:"Stripe Checkout" inurl:"checkout"',
        'inurl:"/pay" "stripe"',
        'inurl:"/success" "stripe checkout"',
        'inurl:"/cancel" "stripe checkout"',
        '"powered by Stripe" inurl:"checkout"',
        '"stripe.com/docs/payments/checkout"',
        'inurl:"/payment/stripe/" "checkout"',
        '"checkout.stripe.com" intext:"Enter your payment details"'
    ]
    return [f'{keyword}' for keyword in keywords]

def fetch_search_results(query):
    result_links = []
    for url in search(query, num_results=10, lang="en"):
        result_links.append(url)
    return result_links

def check_url_accessibility(url):
    try:
        response = requests.head(url, timeout=5)
        return response.status_code == 200
    except requests.RequestException:
        return False

def main():
    dorks = generate_dorks()
    accessible_links = {}

    for dork in dorks:
        print(f"\nSearching for dork: {dork}\n")
        result_links = fetch_search_results(dork)
        for link in result_links:
            if check_url_accessibility(link):
                accessible_links[link] = dork
                print(f"Accessible: {link}")
            else:
                print(f"Inaccessible: {link}")

    print("\nAccessible Links Summary:")
    for link, dork in accessible_links.items():
        print(f"Dork: {dork} => {link}")

if __name__ == "__main__":
    main()
