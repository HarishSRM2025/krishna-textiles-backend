"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmsService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let CmsService = class CmsService {
    constructor() {
        this.dataFilePath = path.join(process.cwd(), 'cms-store.json');
        this.defaultBanners = [
            {
                id: 'banner-1',
                tag: '10,000+ PRODUCTS · PAN-INDIA DELIVERY',
                title: 'Never Run Out of\nQuality Textiles',
                subtitle: 'Direct manufacturer pricing for retail & bulk orders. Over 10,000+ products delivered across 28,000+ pincodes in India.',
                image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1400',
                linkUrl: '/category/all',
                buttonText: 'Explore Catalog',
                secondaryLinkUrl: '/offers',
                secondaryButtonText: 'View Offers',
                badgeText: 'Factory Direct Sourcing',
                accentColor: '#c59b27',
                priority: 1,
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                id: 'banner-2',
                tag: 'FESTIVE & WEDDING COLLECTION',
                title: 'Pure Banarasi & Kanchipuram\nSilk Heritage',
                subtitle: 'Handwoven by master artisans with authentic certified zari border and bridal motifs.',
                image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1400',
                linkUrl: '/category/sarees',
                buttonText: 'Shop Silk Sarees',
                secondaryLinkUrl: '/category/lehengas',
                secondaryButtonText: 'Bridal Fabrics',
                badgeText: 'Festive Festive 2026',
                accentColor: '#d32f2f',
                priority: 2,
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                id: 'banner-3',
                tag: 'TIRUPPUR KNITWEAR HUBS',
                title: 'Men & Kids Combed\nCotton Essentials',
                subtitle: 'Premium 100% bio-washed cotton vests, briefs, loungewear & tees direct from mill.',
                image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&q=80&w=1400',
                linkUrl: '/category/mens-wear',
                buttonText: 'Shop Men\'s Collection',
                secondaryLinkUrl: '/category/kids-wear',
                secondaryButtonText: 'Kids Wear',
                badgeText: 'Wholesale Packs Available',
                accentColor: '#0c2340',
                priority: 3,
                isActive: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        ];
        this.defaultPages = [
            {
                id: 'page-about',
                title: 'About Krishna Textiles',
                slug: 'about-us',
                content: `### Welcome to Krishna Textiles Pvt Ltd

Established in the textile heartland of Tiruppur and Erode, Tamil Nadu, Krishna Textiles has grown into one of South India's foremost integrated textile manufacturing and wholesale distribution powerhouses.

#### Our Heritage & Production Capabilities
With over 450 modern shuttleless looms and advanced dyeing infrastructure, we produce over 80,000 meters of premium woven grey and finished textiles every day. Our catalog spans:
- Traditional Pure & Art Silk Sarees, Dhotis, and Angavastrams
- 100% Bio-Washed Combed Cotton Knits & Innerwear
- Premium Export-Grade Linen and Cotton Suiting/Shirting fabrics
- Specialized Uniform and Institutional Textile yardage

#### Direct Mill Advantage
By eliminating middlemen and connecting merchants, boutiques, and consumers directly to our spinning and weaving facilities, we guarantee unbeatable wholesale pricing, stringent ISO-certified quality audits, and pan-India dispatch capability.`,
                metaDescription: 'Learn about Krishna Textiles — South India\'s premier manufacturer of authentic sarees, dhotis, cotton knitwear, and home textiles.',
                isPublished: true,
                lastUpdatedBy: 'Admin',
                updatedAt: new Date().toISOString(),
            },
            {
                id: 'page-shipping',
                title: 'Shipping & Pan-India Logistics Policy',
                slug: 'shipping-policy',
                content: `### Fast, Reliable Pan-India Delivery

Krishna Textiles partners with top courier and cargo providers (Blue Dart, Delhivery, DTDC, VRL Cargo, and India Post) to ensure safe transit across all 28,000+ postal pincodes in India.

#### Dispatch & Timelines
- **Processing Window**: Orders are inspected, packed with moisture-barrier packaging, and dispatched within 24 to 48 business hours from our Erode or Tiruppur logistics hubs.
- **Estimated Transit Time**:
  - Tamil Nadu & South India: 1–3 business days.
  - Metro Hubs (Mumbai, Delhi-NCR, Kolkata, Bangalore, Hyderabad): 2–4 business days.
  - Rest of India: 4–6 business days.
  - Remote/Northeast regions: 6–8 business days.
- **Tracking**: A unique 9-digit Order ID and courier AWB number with real-time tracking link is dispatched via SMS and WhatsApp as soon as your shipment is handed over.
- **Shipping Rates**: Free shipping on all retail orders above ₹999. Nominal flat fee of ₹49 applies for orders below the threshold. Commercial freight for wholesale rolls is calculated at direct transport charges.`,
                metaDescription: 'Detailed shipping guidelines, dispatch schedules, and delivery transit timelines for Krishna Textiles orders across India.',
                isPublished: true,
                lastUpdatedBy: 'Admin',
                updatedAt: new Date().toISOString(),
            },
            {
                id: 'page-returns',
                title: 'Returns, Replacement & Cancellation Policy',
                slug: 'returns-policy',
                content: `### Hassle-Free 7-Day Replacement Guarantee

We take pride in our textile craft and quality standards. If you receive an item that is defective, damaged in transit, or has a manufacturing weave flaw, we are committed to making it right.

#### Eligibility for Replacement
- **Window**: Replacement requests must be initiated within 7 days of receiving the delivery.
- **Condition**: Items must be unused, unwashed, with original mill tags, barcode stickers, and invoices intact.
- **Customized Fabrics**: Pre-cut yardage and custom stitched apparel are eligible for return only in cases of clear manufacturing defect.
- **Process**: Reach out to our customer care at care@krishnatextiles.com or call +91 421 249 8899 with photos of the damaged article. Our logistics partner will pick up the parcel from your doorstep.`,
                metaDescription: 'Our 7-day hassle-free replacement and quality guarantee policy for all textile products.',
                isPublished: true,
                lastUpdatedBy: 'Admin',
                updatedAt: new Date().toISOString(),
            },
            {
                id: 'page-terms',
                title: 'Terms of Service & Commercial Conditions',
                slug: 'terms-and-conditions',
                content: `### Terms & Conditions

Welcome to the Krishna Textiles official storefront and wholesale portal. By accessing, placing an order, or browsing this portal, you agree to comply with the terms set forth herein.

#### 1. Pricing & GST
All retail product prices displayed on the webstore are in Indian Rupees (INR) inclusive of standard 5% GST on textile goods. B2B wholesale orders may submit their GSTIN during checkout or customer onboarding for claiming input tax credit (ITC).

#### 2. Color & Weave Representation
Due to natural fiber characteristics and varying screen resolutions, actual fabric colors may vary slightly from online representations. Minor variations in handloom slubs and zari sheen are hallmarks of genuine woven craftsmanship.

#### 3. Intellectual Property
All product photographs, digital assets, descriptions, and textile brand trademarks belong exclusively to Krishna Textiles Pvt Ltd. Unauthorized copying or redistribution is strictly prohibited.`,
                metaDescription: 'Official terms and conditions governing purchases and usage on the Krishna Textiles platform.',
                isPublished: true,
                lastUpdatedBy: 'Admin',
                updatedAt: new Date().toISOString(),
            },
            {
                id: 'page-contact',
                title: 'Contact, Mill Location & Showroom',
                slug: 'contact-us',
                content: `### Get in Touch with Krishna Textiles

Whether you are a retail customer seeking sizing assistance or a boutique retailer looking for bulk dealership, our customer service team and mill merchandisers are here to assist you.

#### Showroom & Headquarters
- **Main Facility**: 88/4, Tiruppur Main Textile Complex, Avinashi Road, Tiruppur, Tamil Nadu – 641604
- **Weaving & Logistics Hub**: Mill Road, Erode Industrial Estate, Tamil Nadu – 638001

#### Customer Support & Enquiries
- **Helpline**: +91 421 249 8899 (Mon–Sat, 9:00 AM to 7:00 PM IST)
- **WhatsApp Support**: +91 98422 11099
- **Retail Orders**: support@krishnatextiles.com
- **Wholesale & Export Inquiries**: wholesale@krishnatextiles.com`,
                metaDescription: 'Showroom address, contact phone numbers, email IDs, and location details for Krishna Textiles mills in Tiruppur and Erode.',
                isPublished: true,
                lastUpdatedBy: 'Admin',
                updatedAt: new Date().toISOString(),
            },
        ];
        this.defaultAnnouncement = {
            id: 'announcement-1',
            text: 'FESTIVE WEAVE SALE: Flat 15% Off with code FESTIVE15 · Free Pan-India Delivery on orders above ₹999!',
            linkUrl: '/offers',
            badgeText: 'LIMITED OFFER',
            bgColor: '#d32f2f',
            textColor: '#ffffff',
            isActive: true,
            updatedAt: new Date().toISOString(),
        };
        this.banners = [];
        this.pages = [];
        this.announcement = this.defaultAnnouncement;
        this.loadData();
    }
    loadData() {
        try {
            if (fs.existsSync(this.dataFilePath)) {
                const raw = fs.readFileSync(this.dataFilePath, 'utf-8');
                const parsed = JSON.parse(raw);
                this.banners = parsed.banners?.length ? parsed.banners : this.defaultBanners;
                this.pages = parsed.pages?.length ? parsed.pages : this.defaultPages;
                this.announcement = parsed.announcement || this.defaultAnnouncement;
                return;
            }
        }
        catch (e) {
            console.error('Error reading CMS store file, using defaults:', e);
        }
        this.banners = [...this.defaultBanners];
        this.pages = [...this.defaultPages];
        this.announcement = { ...this.defaultAnnouncement };
        this.saveData();
    }
    saveData() {
        try {
            fs.writeFileSync(this.dataFilePath, JSON.stringify({
                banners: this.banners,
                pages: this.pages,
                announcement: this.announcement,
            }, null, 2));
        }
        catch (e) {
            console.error('Failed to write CMS store file:', e);
        }
    }
    async getAllBanners() {
        return this.banners.sort((a, b) => a.priority - b.priority);
    }
    async getBanner(id) {
        const banner = this.banners.find((b) => b.id === id);
        if (!banner)
            throw new common_1.NotFoundException(`Banner with ID '${id}' not found`);
        return banner;
    }
    async createBanner(data) {
        const newBanner = {
            id: 'banner-' + Date.now(),
            title: data.title || 'New Promotional Banner',
            tag: data.tag || 'SPECIAL COLLECTION',
            subtitle: data.subtitle || '',
            image: data.image || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1400',
            linkUrl: data.linkUrl || '/category/all',
            buttonText: data.buttonText || 'Shop Now',
            secondaryLinkUrl: data.secondaryLinkUrl || '',
            secondaryButtonText: data.secondaryButtonText || '',
            badgeText: data.badgeText || '',
            accentColor: data.accentColor || '#c59b27',
            priority: Number(data.priority) || this.banners.length + 1,
            isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        this.banners.push(newBanner);
        this.saveData();
        return newBanner;
    }
    async updateBanner(id, data) {
        const index = this.banners.findIndex((b) => b.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Banner '${id}' not found`);
        this.banners[index] = {
            ...this.banners[index],
            ...data,
            priority: data.priority !== undefined ? Number(data.priority) : this.banners[index].priority,
            updatedAt: new Date().toISOString(),
        };
        this.saveData();
        return this.banners[index];
    }
    async deleteBanner(id) {
        const index = this.banners.findIndex((b) => b.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Banner '${id}' not found`);
        const removed = this.banners.splice(index, 1)[0];
        this.saveData();
        return removed;
    }
    async getAllPages() {
        return this.pages;
    }
    async getPageBySlug(slug) {
        const page = this.pages.find((p) => p.slug === slug || p.id === slug);
        if (!page)
            throw new common_1.NotFoundException(`Page '${slug}' not found`);
        return page;
    }
    async createPage(data) {
        const slug = (data.slug || data.title || 'untitled')
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-');
        const newPage = {
            id: 'page-' + Date.now(),
            title: data.title || 'Untitled Page',
            slug,
            content: data.content || '',
            metaDescription: data.metaDescription || '',
            isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
            lastUpdatedBy: data.lastUpdatedBy || 'Admin',
            updatedAt: new Date().toISOString(),
        };
        this.pages.push(newPage);
        this.saveData();
        return newPage;
    }
    async updatePage(id, data) {
        const index = this.pages.findIndex((p) => p.id === id || p.slug === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Page '${id}' not found`);
        this.pages[index] = {
            ...this.pages[index],
            ...data,
            updatedAt: new Date().toISOString(),
        };
        this.saveData();
        return this.pages[index];
    }
    async deletePage(id) {
        const index = this.pages.findIndex((p) => p.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`Page '${id}' not found`);
        const removed = this.pages.splice(index, 1)[0];
        this.saveData();
        return removed;
    }
    async getAnnouncement() {
        return this.announcement;
    }
    async updateAnnouncement(data) {
        this.announcement = {
            ...this.announcement,
            ...data,
            updatedAt: new Date().toISOString(),
        };
        this.saveData();
        return this.announcement;
    }
};
exports.CmsService = CmsService;
exports.CmsService = CmsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CmsService);
//# sourceMappingURL=cms.service.js.map