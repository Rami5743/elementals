# Pulse Handoff

Batch-90: 54/90

**Introduces:** The finite first power pulse is insufficient to reach the far contact. A second operator receives access only during transit, and must take over the power; the far certificate then needs both the cargo and the live second pulse.

## Intended solution
1. Air releases Fire's launch workshop.
2. Fire launches the isolated cargo shuttle. Its first pulse is shorter than the full trip.
3. The mid-track heavy contact releases Water's feed station.
4. Water extends the power before the first pulse expires; the cargo can now reach the far contact.
5. Earth crosses the far-contact gate while the feed pulse is live and records the far-bank certificate.
6. Both operators must stop feeding the engine; the shuttle returns to its home contact.
7. Fire uses the home contact and Earth's certificate to access the final Fire relay.
8. Water leaves the expired feed station and uses Fire's relay to authorize Air's final workshop.
9. Air uses the returned cargo and both certificates to release the three other exits; all four collect their gems and finish.

## Why each player is needed
Fire alone reaches the launch switch, Water alone reaches the feed station unlocked by transit, Earth must record the live far-bank state, and Air must both authorize the launch and release the final exits. The galleries are separated by solid rock.

## Insight
Keeping the cargo moving is not the final objective: its two power supplies have to be handed off in flight and then relinquished to recover the original contact. The same cargo is claimed by two mutually exclusive certificates.

## Motor challenge and recovery
The two 520-tick pulses individually cannot complete the 683-tick trip. Both the second dispatch and the Earth crossing were tested with 90 ticks of extra delay. A missed first feed can be retried after the shuttle returns, from the same safe gallery. Missing the Earth crossing is also recoverable by another full launch and feed. All these routes were simulated. Buttons are reusable; repeatedly pressing the launch alone cannot satisfy the far gate's feed input.

## Shortcuts
Omitting either pulse fails in simulation. The far gate requires the far contact and the second pulse together, and the final interlock requires the near contact. The full-height gates and isolated cargo gallery prevent jumping the gate or replacing the cargo with a body.

## Kinship
Keep It Spinning in the campaign asks a rider to repeatedly feed one machine. Here two separate operators hand off a finite power pulse across a mid-track access lock, and must let the power expire after a third operator certifies delivery. Brake Council instead parks a loop at a transit contact; no finite-pulse handoff is required there.

## Preparation and verification

Measured wall-clock time in the automated build, simulation and catalogue-input retrieval phase: 12.46 s. Shared design/tool preparation, earlier uninstrumented work and final Git publication are excluded; this is not total human-visible elapsed time.

Recorded solution: 42.03 s; par: 106 s. All kit simulation checks passed without warnings.
Both 90-tick delayed departures, an omitted first feed followed by a successful new launch, and an expired Earth crossing followed by a full second dispatch were simulated.
