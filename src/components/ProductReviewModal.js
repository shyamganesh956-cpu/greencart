import React, { useState, useEffect } from 'react';
import { 
  Star, 
  X, 
  CheckCircle2, 
  ThumbsUp, 
  MessageSquare, 
  Award,
  Sparkles 
} from 'lucide-react';

const INITIAL_DEMO_REVIEWS = [
  {
    id: 1,
    author: 'Kavitha Ramasamy',
    rating: 5,
    date: 'Yesterday',
    comment: 'Super fresh quality! Delivered within 25 minutes in Coimbatore. The leaves were crisp and vibrant.',
    verified: true,
    helpfulCount: 14
  },
  {
    id: 2,
    author: 'Arun Kumar',
    rating: 5,
    date: '3 days ago',
    comment: 'Much better than local supermarket produce. Properly cold-chain packed and clean packaging.',
    verified: true,
    helpfulCount: 9
  },
  {
    id: 3,
    author: 'Deepa Narayanan',
    rating: 4,
    date: 'Last week',
    comment: 'Great value for money. Very convenient to order bundle ingredients for recipes directly.',
    verified: true,
    helpfulCount: 6
  }
];

export default function ProductReviewModal({
  isOpen,
  onClose,
  product = null
}) {
  const [reviews, setReviews] = useState(INITIAL_DEMO_REVIEWS);
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load reviews from localStorage
  useEffect(() => {
    if (product) {
      const storageKey = `greencart_reviews_${product.id || 'default'}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          setReviews(JSON.parse(saved));
        } catch (e) {
          setReviews(INITIAL_DEMO_REVIEWS);
        }
      } else {
        setReviews(INITIAL_DEMO_REVIEWS);
      }
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newRev = {
      id: Date.now(),
      author: newAuthor.trim() || 'Happy Customer',
      rating: newRating,
      date: 'Just now',
      comment: newComment.trim(),
      verified: true,
      helpfulCount: 1
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);
    
    // Save to localStorage
    const storageKey = `greencart_reviews_${product.id || 'default'}`;
    localStorage.setItem(storageKey, JSON.stringify(updated));

    setNewAuthor('');
    setNewComment('');
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="modal-backdrop-fade" onClick={onClose}>
      <div 
        className="product-review-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="review-modal-header">
          <div className="review-product-info">
            <h3 className="review-title">Customer Reviews &amp; Ratings</h3>
            <p className="review-subtitle">
              Verified customer feedback for <strong>{product.name}</strong> ({product.unit})
            </p>
          </div>
          <button 
            type="button" 
            className="review-close-btn" 
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Rating Breakdown Banner */}
        <div className="rating-summary-banner">
          <div className="big-rating-score">
            <span className="big-score-num">{avgRating}</span>
            <div className="stars-row">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star 
                  key={s} 
                  size={18} 
                  fill={s <= Math.round(Number(avgRating)) ? '#f59e0b' : 'none'} 
                  color={s <= Math.round(Number(avgRating)) ? '#f59e0b' : '#cbd5e1'} 
                />
              ))}
            </div>
            <span className="rating-count-label">Based on {reviews.length} reviews</span>
          </div>

          <div className="quality-trust-badges">
            <div className="trust-badge-row">
              <CheckCircle2 size={16} color="#059669" />
              <span>100% Certified Farm Source</span>
            </div>
            <div className="trust-badge-row">
              <Award size={16} color="#059669" />
              <span>Daily Quality Check Cleared</span>
            </div>
            <div className="trust-badge-row">
              <Sparkles size={16} color="#059669" />
              <span>98% Customers Recommend this</span>
            </div>
          </div>
        </div>

        {/* Existing Reviews List */}
        <div className="reviews-scroll-list">
          <h4 className="reviews-list-heading">
            <MessageSquare size={16} /> Verified Customer Feedback
          </h4>

          {reviews.map((rev) => (
            <div key={rev.id} className="review-item-card">
              <div className="review-item-header">
                <div className="reviewer-info">
                  <span className="reviewer-name">{rev.author}</span>
                  {rev.verified && (
                    <span className="verified-badge">
                      ✓ Verified Buyer
                    </span>
                  )}
                </div>
                <span className="review-date">{rev.date}</span>
              </div>

              <div className="stars-row-small">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star 
                    key={s} 
                    size={14} 
                    fill={s <= rev.rating ? '#f59e0b' : 'none'} 
                    color={s <= rev.rating ? '#f59e0b' : '#cbd5e1'} 
                  />
                ))}
              </div>

              <p className="review-text">{rev.comment}</p>

              <div className="review-helpful-row">
                <button type="button" className="helpful-btn">
                  <ThumbsUp size={13} />
                  <span>Helpful ({rev.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Form */}
        <form className="write-review-form" onSubmit={handleSubmitReview}>
          <h4 className="write-form-title">Write a Review</h4>
          
          {submitSuccess && (
            <div className="review-success-alert">
              ✓ Thank you! Your review has been submitted and posted.
            </div>
          )}

          <div className="rating-select-row">
            <span className="rate-label">Your Rating:</span>
            <div className="rating-clickable-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="star-click-btn"
                  onClick={() => setNewRating(star)}
                >
                  <Star 
                    size={22} 
                    fill={star <= newRating ? '#f59e0b' : 'none'} 
                    color={star <= newRating ? '#f59e0b' : '#cbd5e1'} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="form-inputs-grid">
            <input 
              type="text"
              placeholder="Your Name (e.g. Shyam S.)"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              className="review-author-input"
            />
            <input 
              type="text"
              placeholder="Write your experience with this item..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
              className="review-comment-input"
            />
            <button type="submit" className="submit-review-btn">
              Post Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
